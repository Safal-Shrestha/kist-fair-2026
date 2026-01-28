import 'package:flutter/material.dart';
import 'package:payment/Screens/HomePage/bottom_navigation_home_page.dart';
import 'package:payment/Screens/HomePage/load_send_part.dart';
import 'package:payment/Screens/HomePage/logo_part.dart';
import 'package:payment/Screens/QrScan/qr_scan.dart';
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
      bottomNavigationBar: BottomNavigationHomePage(isHomePage: true),
      floatingActionButton: BottomNavigationFloatingButton(),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
    );
  }
}

class BottomNavigationFloatingButton extends StatelessWidget {
  const BottomNavigationFloatingButton({super.key});

  @override
  Widget build(BuildContext context) {
    return FloatingActionButton(
      onPressed: () {
        Navigator.push(
          context,
          MaterialPageRoute(builder: (context) => QrScan()),
        );
      },
      shape: CircleBorder(),
      backgroundColor: Styles.primaryColor,
      child: Icon(Icons.qr_code_scanner),
    );
  }
}
