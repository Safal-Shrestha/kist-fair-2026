import 'package:flutter/material.dart';
import 'package:payment/styles.dart';

class OfflineFeatures extends StatelessWidget {
  const OfflineFeatures({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.only(top: 10),
      padding: EdgeInsets.only(top: 20, bottom: 20, left: 15, right: 10),
      decoration: BoxDecoration(
        color: Styles.fillColor,
        borderRadius: BorderRadius.circular(20),
      ),
      width: MediaQuery.of(context).size.width * 0.95,
      child: Column(
        spacing: 5,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            "Features",
            style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
          ),
          Row(children: [SendMoneyButton()]),
        ],
      ),
    );
  }
}

class SendMoneyButton extends StatelessWidget {
  const SendMoneyButton({super.key});

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: () {
        // Navigator.push(
        //   context,
        //   MaterialPageRoute(builder: (context) => SendMoney()),
        // );
      },
      style: ElevatedButton.styleFrom(
        backgroundColor: Styles.fillColor,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
        shadowColor: Colors.transparent,
      ),
      child: Column(
        children: [
          Column(
            children: [
              Icon(Icons.arrow_drop_up, size: 20, color: Styles.primaryColor),
              Icon(Icons.account_balance_wallet, size: 20),
            ],
          ),
          Text(
            "Send\nMoney",
            textAlign: TextAlign.center,
            style: TextStyle(fontSize: 10),
          ),
        ],
      ),
    );
  }
}
