import 'package:flutter/material.dart';
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
    );
  }
}
