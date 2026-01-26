import 'package:flutter/material.dart';
import 'package:payment/Screens/BankTransfer/bank_transfer.dart';
import 'package:payment/Screens/SendMoney/send_money.dart';
import 'package:payment/styles.dart';
import 'package:payment/Screens/LoadMoney/load_money.dart';

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
        children: [LoadMoneyButton(), SendMoneyButton(), BankTransferButton()],
      ),
    );
  }
}

class LoadMoneyButton extends StatelessWidget {
  const LoadMoneyButton({super.key});

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Center(
        child: ElevatedButton(
          style: ElevatedButton.styleFrom(
            backgroundColor: Styles.fillColor,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(10),
            ),
            shadowColor: Colors.transparent,
          ),
          onPressed: () {
            Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => LoadMoney()),
            );
          },
          child: Column(
            children: [
              Column(
                children: [
                  Icon(
                    Icons.arrow_drop_down,
                    size: 20,
                    color: Styles.primaryColor,
                  ),
                  Icon(Icons.account_balance_wallet, size: 20),
                ],
              ),
              Text(
                "Load\nMoney",
                textAlign: TextAlign.center,
                style: TextStyle(fontSize: 10),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class SendMoneyButton extends StatelessWidget {
  const SendMoneyButton({super.key});

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Center(
        child: ElevatedButton(
          onPressed: () {
            Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => SendMoney()),
            );
          },
          style: ElevatedButton.styleFrom(
            backgroundColor: Styles.fillColor,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(10),
            ),
            shadowColor: Colors.transparent,
          ),
          child: Column(
            children: [
              Column(
                children: [
                  Icon(
                    Icons.arrow_drop_up,
                    size: 20,
                    color: Styles.primaryColor,
                  ),
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
        ),
      ),
    );
  }
}

class BankTransferButton extends StatelessWidget {
  const BankTransferButton({super.key});

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Center(
        child: ElevatedButton(
          onPressed: () {
            Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => BankTransfer()),
            );
          },
          style: ElevatedButton.styleFrom(
            backgroundColor: Styles.fillColor,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(10),
            ),
            shadowColor: Colors.transparent,
          ),
          child: Container(
            margin: EdgeInsets.only(top: 19),
            child: Column(
              children: [
                Icon(Icons.account_balance, size: 24),
                Text(
                  "Bank\nTransfer",
                  textAlign: TextAlign.center,
                  style: TextStyle(fontSize: 10),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
