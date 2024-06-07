// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as path from 'path';
import { promises as fs } from 'fs';
import { Post } from 'src/entities/post.entity';
import { Image } from 'src/entities/image.entity';
import { CreatePostDto } from 'src/dtos/createPost.dto';
import { CreateImageDto } from 'src/dtos/createImg.dto';
import { User } from 'src/entities/user.entity';
import { Notification } from 'src/entities/notification.entity';
import { Save } from 'src/entities/save.entity';
import { Comment } from 'src/entities/comment.entity';
import { Repost } from 'src/entities/repost.entity';
import { React } from 'src/entities/react.entity';
import { Spam } from 'src/entities/spam.entity';
import { actionAlreadyDoneException } from 'src/exceptions/actionAlreadyDone.exception';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
    @InjectRepository(Save)
    private saveRepository: Repository<Save>,
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(Repost)
    private repostRepository: Repository<Repost>,
    @InjectRepository(React)
    private reactRepository: Repository<React>,
    @InjectRepository(Spam)
    private spamRepository: Repository<Spam>,
  ){}
  async addPost(images: Array<Express.Multer.File>, content: string, post_visibility: string, userId: number): Promise<any> {
    const uploadsDir = path.join(__dirname, '..', 'uploads');
    const user = await this.userRepository.findOne({where: {id: userId}});
    if(!user.completeSignup){
      throw new UnauthorizedException();
    }
    await fs.mkdir(uploadsDir, { recursive: true });

    const post = this.postRepository.create({
      postContent: content,
      postVisibility: post_visibility,
      userId: user.id,
      postDate: new Date(),
      postViews: 0,
    });
    const savedPost = await this.postRepository.save(post);
    const postId = savedPost.postId;

    const savedFiles = [];
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const filePath = path.join(uploadsDir, image.originalname);
      await fs.writeFile(filePath, image.buffer);

      const imageEntity = this.imageRepository.create({ 
        imgLink: filePath,
        post: savedPost,
        imgOrder: i,
      });
      await this.imageRepository.save(imageEntity);
      savedFiles.push(filePath);
    }

    for (const filePath of savedFiles) {
      try {
        await this.processImage(filePath);
      } catch (error) {
        console.error('Error processing image:', error);
      }
    }

    const follow = await this.userRepository.findOne({where: { id: userId }, relations: ['followers']});
    const followers = follow.followers;

    const notifications = followers.map(follower => {
      return this.notificationRepository.create({
        notifName: `${user.firstname} ${user.lastname} just posted a new post.`,
        notifType: 'post',
        notifDate: new Date(),
        userId: follower.id,
        notifStatus: 'unread',
        notifLink: String(post.postId),
      });
    });
    await this.notificationRepository.save(notifications);
    return savedPost;
  }

  async processImage(imagePath: string): Promise<void> {
    console.log(imagePath);
  }


  async savePost(userId: number, postId: number): Promise<any> {
    const post = await this.postRepository.findOne({where: { postId }});
    const user = await this.userRepository.findOne({where: { id: userId }});
    const save = await this.saveRepository.findOne({ where: { userId, postId } });
    if (save) {
      await this.saveRepository.remove(save);
      return { message: 'Post unsaved successfully.' };
    } else {
      const newSave = this.saveRepository.create({
          post,
          user,
          userId,
          postId,
          saveDate: new Date()
      });
      await this.saveRepository.save(newSave);
      return { message: 'Post saved successfully.' };
    }
  }

  async addComment(content: string, postId: number, userId: number): Promise<any> {
    const post = await this.postRepository.findOne({where: { postId }});
    const user = await this.userRepository.findOne({where: { id: userId }});
    const newComment = this.commentRepository.create({
        commentContent: content,
        user,
        post,
        userId,
        postId,
        commentDate: new Date()
    });
    const comment = await this.commentRepository.save(newComment);
    if(userId!=post.userId){
      const newNotification = this.notificationRepository.create({
        notifName: `${user.firstname} ${user.lastname} just commented on your post.`,
        notifType: 'comment',
        notifDate: new Date(),
        userId: post.userId,
        notifStatus: 'unread',
        notifLink: String(comment.commentId),
      });
      await this.notificationRepository.save(newNotification);
    }
    return { message: 'comment saved successfully.' };
  }

  async repost(content: string, postId: number, userId: number): Promise<any> {
    const post = await this.postRepository.findOne({where: { postId }});
    const user = await this.userRepository.findOne({where: { id: userId }});
    const newRepost = this.repostRepository.create({
        repostComment: content,
        user,
        post,
        userId,
        postId,
        repostDate: new Date()
    });
    const repost = await this.commentRepository.save(newRepost);
    if(userId!=post.userId){
      const newNotification = this.notificationRepository.create({
        notifName: `${user.firstname} ${user.lastname} just reposted your post.`,
        notifType: 'repost',
        notifDate: new Date(),
        userId: post.userId,
        notifStatus: 'unread',
        notifLink: String(repost.repostId),
      });
      await this.notificationRepository.save(newNotification);
    }
    const follow = await this.userRepository.findOne({where: { id: userId }, relations: ['followers']});
    const followers = follow.followers;

    const notifications = followers.map(follower => {
      if(post.userId!=follower.id){
        return this.notificationRepository.create({
          notifName: `${user.firstname} ${user.lastname} just reposted a post.`,
          notifType: 'repost',
          notifDate: new Date(),
          userId: follower.id,
          notifStatus: 'unread',
          notifLink: String(repost.repostId),
        });
      }
    });
    await this.notificationRepository.save(notifications);
    return { message: 'repost saved successfully.' };
  }

  async react(react_type: string, userId: number, postId: number): Promise<any> {
    const post = await this.postRepository.findOne({where: { postId }});
    const user = await this.userRepository.findOne({where: { id: userId }});
    const newReact = this.reactRepository.create({
        post,
        user,
        userId,
        postId,
        reactDate: new Date(),
        reactType: react_type,
    });
    await this.saveRepository.save(newReact);
    const newNotification = this.notificationRepository.create({
      notifName: `${user.firstname} ${user.lastname} just reacted your post.`,
      notifType: 'react',
      notifDate: new Date(),
      userId: post.userId,
      notifStatus: 'unread',
      notifLink: String(post.postId),
    });
    await this.notificationRepository.save(newNotification);
  await this.saveRepository.save(newReact);
    return { message: 'reacted successfully.' };
  }

  async checkReact(userId: number, postId: number): Promise<boolean> {
    const post = await this.postRepository.findOne({where: { postId }});
    const user = await this.userRepository.findOne({where: { id: userId }});
    const react = await this.reactRepository.findOne({ where: { userId, postId } });
    if (react) {
      const notif = await this.notificationRepository.findOne({ where: { userId:post.userId, notifLink: String(post.postId), notifType: 'react', notifName:`${user.firstname} ${user.lastname} just reacted to your post.`}});
      if(notif){
        await this.notificationRepository.remove(notif);
      }
      await this.reactRepository.remove(react);
      return true;
    } 
    return false;
  }

  async reportPost(userId: number, postId: number, spamContent: string): Promise<any> {
    const post = await this.postRepository.findOne({where: { postId }});
    const user = await this.userRepository.findOne({where: { id: userId }});
    const spam = await this.spamRepository.findOne({ where: { reporterId: userId, postId}});
    if(spam){
      throw new actionAlreadyDoneException();
    }
    const newSpam = this.spamRepository.create({
      spamContent: spamContent,
      spamType: 'post',
      spamDate: new Date(),
      reportedBy: user,
      reportedId: userId,
      post: post,
      postId: post.postId,
    });
    await this.spamRepository.save(newSpam);
  }
}
  

