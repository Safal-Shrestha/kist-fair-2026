import 'package:flutter/material.dart';
import 'package:payment/styles.dart';

class LoadSendPart extends StatelessWidget {
  const LoadSendPart({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: Styles.fillColor,
        borderRadius: BorderRadius.circular(10),
      ),
      margin: EdgeInsets.only(left: 10, right: 10),
      padding: EdgeInsets.only(top: 10, bottom: 10, right: 20, left: 20),
      child: Row(
        children: [
          Expanded(
            child: Center(
              child: Text("Load\nMoney", textAlign: TextAlign.center),
            ),
          ),
          Expanded(
            child: Center(
              child: Text("Send\nMoney", textAlign: TextAlign.center),
            ),
          ),
          Expanded(
            child: Center(
              child: Text("Bank\nTransfer", textAlign: TextAlign.center),
            ),
          ),
        ],
      ),
    );
  }
}
