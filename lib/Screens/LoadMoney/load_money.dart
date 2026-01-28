import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:payment/Screens/HomePage/bottom_navigation_home_page.dart';
import 'package:payment/Screens/HomePage/home_screen.dart';
import 'package:payment/styles.dart';

var isBankConnected = true;
var bankDetails = {
  'name': 'Everest Bank Limited',
  'accountNumber': '00**********12',
  'accountHolder': 'Bipin Thapa',
};

class LoadMoney extends StatefulWidget {
  const LoadMoney({super.key});

  @override
  State<LoadMoney> createState() => _LoadMoneyState();
}

class _LoadMoneyState extends State<LoadMoney> {
  final String currentBalance = "1 00 00 000";

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 2,
      child: Scaffold(
        appBar: AppBar(
          actionsPadding: EdgeInsets.only(right: 20),
          actions: [
            GestureDetector(
              onTap: () {},
              child: Container(
                width: 40,
                height: 40,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  image: DecorationImage(
                    image: AssetImage('assets/luffy.webp'),
                    fit: BoxFit.cover,
                  ),
                ),
              ),
            ),
          ],
          bottom: PreferredSize(
            preferredSize: Size.fromHeight(100),
            child: SizedBox(
              width: MediaQuery.of(context).size.width,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                spacing: 10,
                children: [
                  Padding(
                    padding: const EdgeInsets.only(left: 20, right: 10),
                    child: Column(
                      children: [
                        Text(
                          "Load Your Wallet",
                          style: TextStyle(
                            fontWeight: FontWeight.bold,
                            fontSize: 26,
                          ),
                        ),
                        Text(
                          "Current Balance: Rs. ${currentBalance}",
                          style: TextStyle(fontSize: 12),
                        ),
                      ],
                    ),
                  ),
                  const TabBar(
                    labelColor: Styles.primaryColor,
                    indicatorColor: Styles.primaryColor,

                    indicatorSize: TabBarIndicatorSize.tab,
                    tabs: [
                      Text(
                        "Banks",
                        style: TextStyle(fontWeight: FontWeight.bold),
                      ),
                      Text(
                        "Wireless",
                        style: TextStyle(fontWeight: FontWeight.bold),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ),
        body: TabBarView(children: [BankTab(), Text("data2")]),
        bottomNavigationBar: BottomNavigationHomePage(isHomePage: false),
        floatingActionButton: BottomNavigationFloatingButton(),
        floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
      ),
    );
  }
}

class BankTab extends StatelessWidget {
  const BankTab({super.key});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(top: 10, left: 10, right: 10),
      child: CustomScrollView(
        slivers: [
          SliverToBoxAdapter(
            child: Text(
              "Linked Bank Accounts",
              style: TextStyle(fontWeight: FontWeight.bold),
            ),
          ),
          SliverFillRemaining(
            hasScrollBody: false,
            child: Column(
              children: [
                Container(
                  width: MediaQuery.of(context).size.width * 0.8,
                  padding: EdgeInsets.all(10),
                  decoration: BoxDecoration(
                    color: Styles.fillColor,
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: Row(
                    children: [
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          spacing: 10,
                          children: [
                            Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  bankDetails['name']!,
                                  style: TextStyle(fontWeight: FontWeight.bold),
                                ),
                                Text(bankDetails['accountNumber']!),
                              ],
                            ),
                            Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text("Account Holder"),
                                Text(
                                  bankDetails['accountHolder']!,
                                  style: TextStyle(fontWeight: FontWeight.bold),
                                ),
                              ],
                            ),
                          ],
                        ),
                      ),
                      ElevatedButton(
                        onPressed: () {
                          showModalBottomSheet(
                            showDragHandle: true,
                            isScrollControlled: true,
                            context: context,
                            builder: (context) => Padding(
                              padding: EdgeInsets.only(
                                bottom: MediaQuery.of(
                                  context,
                                ).viewInsets.bottom,
                              ),
                              child: BankBottomPopup(),
                            ),
                          );
                        },
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Color(0xFF2C2C2C),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(10),
                          ),
                          shadowColor: Colors.transparent,
                        ),
                        child: Text(
                          "LOAD",
                          style: TextStyle(
                            fontWeight: FontWeight.bold,
                            color: Styles.primaryColor,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class BankBottomPopup extends StatefulWidget {
  const BankBottomPopup({super.key});

  @override
  State<BankBottomPopup> createState() => _BankBottomPopupState();
}

class _BankBottomPopupState extends State<BankBottomPopup> {
  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: MediaQuery.of(context).size.height * 0.4,
      width: MediaQuery.of(context).size.width,
      child: Padding(
        padding: const EdgeInsets.only(left: 20, right: 20, top: 20),
        child: Column(
          spacing: 30,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              bankDetails['name']!,
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 20),
            ),
            Column(
              spacing: 10,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text("Amount"),
                TextFormField(
                  //amount input
                  decoration: InputDecoration(
                    filled: true,
                    fillColor: Styles.fillColor,
                    hintText: "Enter Amount",
                    hintStyle: TextStyle(color: Colors.grey),
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10),
                      borderSide: BorderSide.none,
                    ),
                    focusedBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10),
                      borderSide: BorderSide(
                        color: Styles.primaryColor,
                        width: 2,
                      ),
                    ),
                  ),
                ),
                Text("Statement"),
                TextFormField(
                  //statement input
                  keyboardType: TextInputType.number,
                  inputFormatters: [FilteringTextInputFormatter.digitsOnly],
                  decoration: InputDecoration(
                    filled: true,
                    fillColor: Styles.fillColor,
                    hintText: "Enter Statement",
                    hintStyle: TextStyle(color: Colors.grey),
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10),
                      borderSide: BorderSide.none,
                    ),
                    focusedBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10),
                      borderSide: BorderSide(
                        color: Styles.primaryColor,
                        width: 2,
                      ),
                    ),
                  ),
                ),
                Row(
                  spacing: 50,
                  children: [
                    Expanded(
                      child: ElevatedButton(
                        onPressed: () {},
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Styles.primaryColor,
                        ),
                        child: Text(
                          "Submit",
                          style: TextStyle(
                            fontWeight: FontWeight.bold,
                            fontSize: 16,
                          ),
                        ),
                      ),
                    ),
                    Expanded(
                      child: ElevatedButton(
                        onPressed: () {},
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Styles.secondaryButtonColor,
                        ),
                        child: Text(
                          "Cancel",
                          style: TextStyle(
                            fontWeight: FontWeight.bold,
                            fontSize: 16,
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
