import 'package:flutter/material.dart';

class BalancePart extends StatefulWidget {
  const BalancePart({super.key});

  @override
  State<BalancePart> createState() => _BalancePartState();
}

class _BalancePartState extends State<BalancePart> {
  String balance = '****';
  bool _isBalanceVisible = false;

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(top: 20, left: 10, right: 10, bottom: 20),
      child: Column(
        spacing: 0,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            spacing: 50,
            children: [
              Expanded(child: Text("Total Balance (Rs.)")),
              IconButton(
                onPressed: () {
                  setState(() {
                    _isBalanceVisible = !_isBalanceVisible;
                    if (_isBalanceVisible) {
                      balance = '1 00 00 000';
                    } else {
                      balance = '****';
                    }
                  });
                },
                icon: Icon(
                  _isBalanceVisible ? Icons.visibility_off : Icons.visibility,
                  size: 20,
                ),
              ),
            ],
          ),
          Text(
            balance,
            style: TextStyle(fontSize: 45, fontWeight: FontWeight.w600),
          ),
        ],
      ),
    );
  }
}
