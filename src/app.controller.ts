import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

const webpush = require('web-push');

const vapidKeys = {
  publicKey:
    'BBR6Wp_jdBtcamjbFKEzBOtxQlaWWTw2NqVDto9U-dY8FTg73kVFHsygy8x1_jxXfOOREX3qygVbqgA9398Su2c',
  privateKey: 'OFadH4nKSlSnVK9AXuqBrcj1Hc0hWEzpJFMZ5j-kh-E',
};

const options = {
  vapidDetails: {
    subject: 'mailto: <v.vaitheeswari@kuwy.in>',
    publicKey:
      'BBR6Wp_jdBtcamjbFKEzBOtxQlaWWTw2NqVDto9U-dY8FTg73kVFHsygy8x1_jxXfOOREX3qygVbqgA9398Su2c',
    privateKey: 'OFadH4nKSlSnVK9AXuqBrcj1Hc0hWEzpJFMZ5j-kh-E',
  },
  TTL: 60,
};

const subscription = {
  endpoint:
    'https://fcm.googleapis.com/fcm/send/fvHgIiO3lOg:APA91bF-oIJ97rRxz7NRxhTvb5GY0B-JPxSHjpd8O2sYLe1i4RocDM1aRbwnqrAE-RA9zLJbMSs4hhWCuip0Z5vbdpJMnm27enrHa4SCMUOVS8WhCw0OcZLWoxpmWGXvqEmXXP09MJfb',
  expirationTime: null,
  keys: {
    p256dh:
      'BNXaOdjMA6oKSbgHkX78gq35DmmeP2xKApdaz5HJhwvkf7o4IvSKhlZcdydsMFbFFefzIxqdOqLHz-NttyiWnC8',
    auth: 'RA1n5hoHkbDh_w59CgG1fQ',
  },
};

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
    //this.sendNotification();
  }

  public sendNotification(message) {
    webpush
      .sendNotification(
        subscription,
        JSON.stringify({
          notification: {
            title: 'Notification',
            body: message,
            icon: 'assets/icons/icon-512x512.png',
            badge: 'assets/icons/icon-72x72.png',
          },
        }),
        options,
      )
      .then((log) => {
        console.log('Push notification sent.');
        console.log(log);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
