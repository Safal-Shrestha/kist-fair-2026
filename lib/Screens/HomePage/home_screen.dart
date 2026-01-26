import 'package:flutter/material.dart';
import 'package:payment/Screens/HomePage/bottom_navigation_home_page.dart';
import 'package:payment/Screens/HomePage/load_send_part.dart';
import 'package:payment/Screens/HomePage/logo_part.dart';
import 'package:payment/styles.dart';

import 'balance_part.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: CustomScrollView(
        slivers: [
          SliverToBoxAdapter(child: LogoPart()),
          SliverToBoxAdapter(child: BalancePart()),
          SliverToBoxAdapter(child: LoadSendPart()),
        ],
      ),
      bottomNavigationBar: BottomNavigationHomePage(),
      floatingActionButton: FloatingActionButton(
        onPressed: () {},
        shape: CircleBorder(),
        backgroundColor: Styles.primaryColor,
        child: Icon(Icons.qr_code_scanner),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
    );
  }
}
