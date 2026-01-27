import 'package:flutter/material.dart';
import 'package:payment/styles.dart';

class NotificationDataNotificationPage extends StatefulWidget {
  const NotificationDataNotificationPage({super.key});

  @override
  State<NotificationDataNotificationPage> createState() =>
      _NotificationDataNotificationPageState();
}

class _NotificationDataNotificationPageState
    extends State<NotificationDataNotificationPage> {
  var notificationData = [
    {
      'Date': 'Jan 26, 2026',
      'Title': 'New User Alert',
      'Message': 'Welcome to e-Sikka new user!',
    },
    {
      'Date': 'Jan 26, 2026',
      'Title': 'New User Alert',
      'Message': 'Welcome to e-Sikka new user!',
    },
    {
      'Date': 'Jan 25, 2026',
      'Title': 'New User Alert',
      'Message':
          'Welcome to e-Sikka new user! dg dsfsdf df esd fse df se df  sadfsd f s dafs dfg sdrfg  dsfg r sew grs tdgr vs rdg f sredfg se drtg ersdg  wres gt trwe g r ewr g wer g wre g wre re ',
    },
  ];

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(10, 20, 10, 20),
      child: Column(
        spacing: 15,
        children: [
          ...notificationData.asMap().entries.map((entry) {
            int index = entry.key;
            var item = entry.value;
            return GestureDetector(
              onTap: () {
                showDialog(
                  context: context,
                  builder: (BuildContext context) {
                    return AlertDialog(
                      backgroundColor: Styles.fillColor,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(20),
                      ),
                      title: Text(
                        item['Title']!,
                        style: TextStyle(fontWeight: FontWeight.w500),
                      ),
                      content: ConstrainedBox(
                        constraints: BoxConstraints(
                          maxHeight: MediaQuery.of(context).size.height * 0.7,
                        ),
                        child: CustomScrollView(
                          shrinkWrap: true,
                          slivers: [
                            SliverToBoxAdapter(child: Divider()),
                            SliverToBoxAdapter(child: Text(item['Message']!)),
                          ],
                        ),
                      ),
                    );
                  },
                );
              },
              child: Column(
                spacing: 8,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  if (index == 0 ||
                      index > 0 &&
                          notificationData[index - 1]['Date'] !=
                              item['Date']) ...[
                    Text(item['Date']!),
                  ],
                  Container(
                    decoration: BoxDecoration(
                      color: Styles.fillColor,
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: Row(
                        crossAxisAlignment: CrossAxisAlignment.center,
                        spacing: 10,
                        children: [
                          Container(
                            width: 50,
                            height: 50,
                            decoration: BoxDecoration(
                              shape: BoxShape.circle,
                              image: DecorationImage(
                                image: AssetImage('assets/luffy.webp'),
                                fit: BoxFit.cover,
                              ),
                            ),
                          ),
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              SizedBox(
                                width: MediaQuery.of(context).size.width * 0.6,
                                child: Text(
                                  item['Title']!,
                                  overflow: TextOverflow.ellipsis,
                                  style: TextStyle(
                                    fontWeight: FontWeight.bold,
                                    fontSize: 18,
                                  ),
                                ),
                              ),
                              SizedBox(
                                width: MediaQuery.of(context).size.width * 0.6,
                                child: Text(
                                  item['Message']!,
                                  overflow: TextOverflow.ellipsis,
                                  style: TextStyle(fontSize: 12),
                                  maxLines: 3,
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            );
          }),
        ],
      ),
    );
  }
}
