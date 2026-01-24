import 'package:flutter/material.dart';
import 'package:payment/Screens/Login/login_page.dart';
import 'package:payment/Screens/Signup/signup_page.dart';

class LowerPart extends StatelessWidget {
  const LowerPart({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Column(spacing: 10, children: [LoginButton(), SignupOption()]),
    );
  }
}

//login button
class LoginButton extends StatefulWidget {
  const LoginButton({super.key});

  @override
  State<LoginButton> createState() => _LoginButtonState();
}

class _LoginButtonState extends State<LoginButton> {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Container(
        width: MediaQuery.of(context).size.width,
        height: 50,
        margin: const EdgeInsets.fromLTRB(20, 0, 20, 0),
        child: ElevatedButton(
          onPressed: () {
            Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => LoginPage()),
            );
          },
          style: ElevatedButton.styleFrom(
            backgroundColor: Colors.deepPurpleAccent,
          ),
          child: Text(
            "Login",
            style: TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.bold,
              color: Colors.white,
            ),
          ),
        ),
      ),
    );
  }
}

//signup option
class SignupOption extends StatefulWidget {
  const SignupOption({super.key});

  @override
  State<SignupOption> createState() => _SignupOptionState();
}

class _SignupOptionState extends State<SignupOption> {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Container(
        width: MediaQuery.of(context).size.width,
        height: 50,
        margin: const EdgeInsets.fromLTRB(20, 0, 20, 0),
        child: OutlinedButton(
          onPressed: () {
            Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => SignupPage()),
            );
          },
          style: OutlinedButton.styleFrom(
            side: BorderSide(color: Colors.deepPurpleAccent, width: 2),
          ),
          child: Text(
            "Signup",
            style: TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.bold,
              color: Colors.white,
            ),
          ),
        ),
      ),
    );
  }
}
