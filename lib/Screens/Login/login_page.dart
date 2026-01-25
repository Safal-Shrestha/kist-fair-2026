import 'package:flutter/material.dart';
import 'package:payment/Screens/Login/lower_part_login_page.dart';
import 'package:payment/Screens/Login/upper_part_login_page.dart';

class LoginPage extends StatelessWidget {
  const LoginPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: CustomScrollView(
        slivers: [
          SliverToBoxAdapter(child: UpperPart()),
          SliverFillRemaining(
            hasScrollBody: false,
            child: LowerPartLoginPage(),
          ),
        ],
      ),
    );
  }
}
