import 'package:flutter/material.dart';
import 'package:payment/Screens/Signup/signup_page.dart';

class FormLowerHalf extends StatelessWidget {
  final VoidCallback? onPressed;

  const FormLowerHalf({super.key, required this.onPressed});

  @override
  Widget build(BuildContext context) {
    return Column(
      spacing: 10,
      children: [
        TextButton(onPressed: () {}, child: Text("Forgot MPIN?")),
        SizedBox(
          width: MediaQuery.of(context).size.width,
          height: 50,
          child: ElevatedButton(
            onPressed: onPressed,
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
          onPressed: () {
            Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => SignupPage()),
            );
          },
          child: Text("SignUp"),
        ),
      ],
    );
  }
}
