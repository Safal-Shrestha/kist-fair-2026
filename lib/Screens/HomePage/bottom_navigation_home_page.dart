import 'package:flutter/material.dart';
import 'package:payment/styles.dart';

class BottomNavigationHomePage extends StatefulWidget {
  const BottomNavigationHomePage({super.key});

  @override
  State<BottomNavigationHomePage> createState() =>
      _BottomNavigationHomePageState();
}

class _BottomNavigationHomePageState extends State<BottomNavigationHomePage> {
  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(color: Styles.fillColor),
      height: 70,
      child: Padding(
        padding: const EdgeInsets.only(left: 10, right: 10, bottom: 5, top: 5),
        child: Row(children: [HomeButton(), TransactionButton()]),
      ),
    );
  }
}

class HomeButton extends StatefulWidget {
  const HomeButton({super.key});

  @override
  State<HomeButton> createState() => _HomeButtonState();
}

class _HomeButtonState extends State<HomeButton> {
  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      style: ElevatedButton.styleFrom(
        shadowColor: Colors.transparent,
        backgroundColor: Styles.fillColor,
      ),
      onPressed: () {},
      child: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [Icon(Icons.home), Text("Home")],
        ),
      ),
    );
  }
}

class TransactionButton extends StatefulWidget {
  const TransactionButton({super.key});

  @override
  State<TransactionButton> createState() => _TransactionButtonState();
}

class _TransactionButtonState extends State<TransactionButton> {
  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      style: ElevatedButton.styleFrom(
        shadowColor: Colors.transparent,
        backgroundColor: Styles.fillColor,
      ),
      onPressed: () {},
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [Icon(Icons.receipt_long), Text("Statement")],
      ),
    );
  }
}
