import 'package:flutter/material.dart';
import 'package:payment/Screens/HomePage/home_screen.dart';
import 'package:payment/styles.dart';

class BottomNavigationHomePage extends StatefulWidget {
  final bool isHomePage;
  const BottomNavigationHomePage({super.key, required this.isHomePage});

  @override
  State<BottomNavigationHomePage> createState() =>
      _BottomNavigationHomePageState();
}

class _BottomNavigationHomePageState extends State<BottomNavigationHomePage> {
  @override
  Widget build(BuildContext context) {
    return BottomAppBar(
      shape: const CircularNotchedRectangle(),
      notchMargin: 8,
      color: Styles.fillColor,
      height: 60,
      child: Row(
        children: [
          Expanded(
            child: Row(
              spacing: 10,
              children: [
                HomeButton(isHomePage: widget.isHomePage),
                TransactionButton(),
              ],
            ),
          ),
          Expanded(
            child: Row(
              spacing: 10,
              mainAxisAlignment: MainAxisAlignment.end,
              children: [BudgetPlanButton(), SettingsButton()],
            ),
          ),
        ],
      ),
    );
  }
}

class HomeButton extends StatefulWidget {
  final bool isHomePage;
  const HomeButton({super.key, required this.isHomePage});

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
        padding: EdgeInsets.only(left: 2, right: 2),
      ),
      onPressed: widget.isHomePage
          ? null
          : () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => HomeScreen()),
              );
            },
      child: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(Icons.home_outlined),
            Text("Home", style: TextStyle(fontSize: 10)),
          ],
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
        backgroundColor: Colors.transparent,
        padding: EdgeInsets.only(left: 2, right: 2),
      ),
      onPressed: () {},
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(Icons.receipt_long),
          Text("Statement", style: TextStyle(fontSize: 10)),
        ],
      ),
    );
  }
}

class BudgetPlanButton extends StatelessWidget {
  const BudgetPlanButton({super.key});

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      style: ElevatedButton.styleFrom(
        shadowColor: Colors.transparent,
        backgroundColor: Colors.transparent,
        padding: EdgeInsets.only(left: 2, right: 2),
      ),
      onPressed: () {},
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(Icons.account_balance_wallet_outlined),
          Text("Wallets", style: TextStyle(fontSize: 10)),
        ],
      ),
    );
  }
}

class SettingsButton extends StatelessWidget {
  const SettingsButton({super.key});

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      style: ElevatedButton.styleFrom(
        shadowColor: Colors.transparent,
        backgroundColor: Styles.fillColor,
        padding: EdgeInsets.only(left: 2, right: 2),
      ),
      onPressed: () {},
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(Icons.settings),
          Text("Settings", style: TextStyle(fontSize: 10)),
        ],
      ),
    );
  }
}
