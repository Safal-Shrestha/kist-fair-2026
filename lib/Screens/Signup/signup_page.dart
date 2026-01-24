import 'package:flutter/material.dart';
import 'package:payment/Screens/Signup/lower_half_signup_page.dart';
import 'package:payment/Screens/Signup/upper_part_signup_page.dart';

class SignupPage extends StatelessWidget {
  const SignupPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        spacing: 30,
        children: [UpperPartSignupPage(), LowerHalfSignupPage()],
      ),
    );
  }
}
