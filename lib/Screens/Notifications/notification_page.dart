import 'package:flutter/material.dart';
import 'package:payment/Screens/Notifications/notification_data_notification_page.dart';
import 'package:payment/Screens/Notifications/upper_part_notification_page.dart';

class NotificationPage extends StatefulWidget {
  const NotificationPage({super.key});

  @override
  State<NotificationPage> createState() => _NotificationState();
}

class _NotificationState extends State<NotificationPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: CustomScrollView(
        slivers: [
          SliverToBoxAdapter(
            child: UpperPartNotificationPage(),
          ), //for appbar of notification page
          SliverFillRemaining(
            hasScrollBody: false,
            child: NotificationDataNotificationPage(),
          ), //for all the notification data
        ],
      ),
    );
  }
}
