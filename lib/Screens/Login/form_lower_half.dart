import 'package:flutter/material.dart';

class FormLowerHalf extends StatelessWidget {
  const FormLowerHalf({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Column(
        spacing: 10,
        children: [
          TextButton(
            onPressed: () {},
            style: TextButton.styleFrom(splashFactory: NoSplash.splashFactory),
            child: Text("Forgot MPIN/Password?"),
          ),
          SizedBox(
            width: MediaQuery.of(context).size.width,
            height: 50,
            child: ElevatedButton(
              onPressed: () {},
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.deepPurpleAccent,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(20),
                ),
              ),
              child: Text("LOGIN"),
            ),
          ),
          TextButton(
            onPressed: () {},
            style: TextButton.styleFrom(splashFactory: NoSplash.splashFactory),
            child: Text("SignUp"),
          ),
        ],
      ),
    );
  }
}
