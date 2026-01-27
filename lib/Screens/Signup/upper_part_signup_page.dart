import 'package:flutter/material.dart';

class UpperPartSignupPage extends StatelessWidget {
  const UpperPartSignupPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(top: 60),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        spacing: 10,
        children: [IconPart(), InfoPart()],
      ),
    );
  }
}

class IconPart extends StatelessWidget {
  const IconPart({super.key});

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(
          child: Container(
            margin: const EdgeInsets.only(left: 20),
            child: Text(
              "Signup",
              style: TextStyle(fontSize: 38, fontWeight: FontWeight.bold),
            ),
          ),
        ),
        Container(
          margin: const EdgeInsets.only(right: 10),
          child: IconButton(
            onPressed: () {
              Navigator.pop(context);
            },
            icon: Icon(Icons.close, size: 32, color: Colors.deepPurpleAccent),
          ),
        ),
      ],
    );
  }
}

class InfoPart extends StatelessWidget {
  const InfoPart({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(left: 20, right: 20),
      child: Text("Fill all below fields."),
    );
  }
}
