import 'package:flutter/material.dart';
import 'package:payment/Screens/NewAppLandingPage/upper_part_landing_page.dart';
import 'package:payment/Screens/Notifications/notification_page.dart';

class LogoPart extends StatefulWidget {
  const LogoPart({super.key});

  @override
  State<LogoPart> createState() => _LogoPartState();
}

class _LogoPartState extends State<LogoPart> {
  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(top: 40, left: 10, right: 5),
      child: Row(
        spacing: 20,
        children: [
          UserProfile(),
          Expanded(
            child: Text(
              "Welcome, Bipin!",
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 20),
            ),
          ),
          Notification(),
        ],
      ),
    );
  }
}

class UserProfile extends StatefulWidget {
  const UserProfile({super.key});

  @override
  State<UserProfile> createState() => _UserProfileState();
}

class _UserProfileState extends State<UserProfile> {
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        print("Logo Pressed!");
      },
      child: Container(
        width: 60,
        height: 60,
        decoration: BoxDecoration(
          shape: BoxShape.circle,
          image: DecorationImage(
            image: AssetImage('assets/luffy.webp'),
            fit: BoxFit.cover,
          ),
        ),
      ),
    );
  }
}

class Notification extends StatefulWidget {
  const Notification({super.key});

  @override
  State<Notification> createState() => _NotificationState();
}

class _NotificationState extends State<Notification> {
  @override
  Widget build(BuildContext context) {
    return IconButton(
      onPressed: () {
        Navigator.push(
          context,
          MaterialPageRoute(builder: (context) => NotificationPage()),
        );
      },
      icon: Icon(Icons.notifications),
    );
  }
}
