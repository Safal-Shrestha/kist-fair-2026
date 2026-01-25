import 'package:flutter/material.dart';
import 'package:payment/Screens/NewAppLandingPage/lower_part_landing_page.dart';
import 'package:payment/Screens/NewAppLandingPage/upper_part_landing_page.dart';

class LandingContainer extends StatelessWidget {
  const LandingContainer({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          Expanded(
            flex: 3,
            child: Container(
              child: UpperPart(),
              height: 400,
              margin: const EdgeInsets.fromLTRB(10, 80, 10, 20),
              alignment: Alignment.center,
            ),
          ),
          Expanded(flex: 1, child: Container(child: LowerPart(), height: 100)),
        ],
      ),
    );
  }
}
