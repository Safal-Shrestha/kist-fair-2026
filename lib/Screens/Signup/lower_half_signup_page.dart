import 'package:flutter/material.dart';

var requiredFields = [
  ['Mobile Number', 'Enter your mobile number'],
  ['Full Name', 'Enter your full name'],
];

class LowerHalfSignupPage extends StatefulWidget {
  const LowerHalfSignupPage({super.key});

  @override
  State<LowerHalfSignupPage> createState() => _LowerHalfSignupPageState();
}

class _LowerHalfSignupPageState extends State<LowerHalfSignupPage> {
  Map<String, String> formData = {};

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(left: 20, right: 20),
      child: Column(
        spacing: 20,
        children: [
          ...requiredFields.map((item) {
            String fieldName = item[0];
            return SignupDataInput(
              label: fieldName,
              hint: item[1],
              onChanged: (value) {
                formData[fieldName] = value;
              },
            );
          }),
          SignupDataOption(),
        ],
      ),
    );
  }
}

class SignupDataInput extends StatelessWidget {
  final String label;
  final String hint;
  final ValueChanged<String>? onChanged;

  const SignupDataInput({
    super.key,
    required this.label,
    required this.hint,
    this.onChanged,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(label),
        TextFormField(
          decoration: InputDecoration(
            filled: true,
            fillColor: Color(0xFF303030),
            hintText: hint,
            hintStyle: TextStyle(color: Colors.grey),
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(10),
              borderSide: BorderSide.none,
            ),
            focusedBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(10),
              borderSide: BorderSide(color: Colors.deepPurpleAccent, width: 2),
            ),
          ),
          onChanged: onChanged,
        ),
      ],
    );
  }
}

class SignupDataOption extends StatefulWidget {
  const SignupDataOption({super.key});

  @override
  State<SignupDataOption> createState() => _SignupDataOptionState();
}

class _SignupDataOptionState extends State<SignupDataOption> {
  String? selectedValue;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text("Gender"),
        DropdownMenu<String>(
          initialSelection: "Male",
          width: MediaQuery.of(context).size.width * 0.9,

          menuStyle: MenuStyle(
            backgroundColor: WidgetStateProperty.all(Color(0xFF1E1E1E)),
            shape: WidgetStateProperty.all(
              RoundedRectangleBorder(borderRadius: BorderRadius.circular(15)),
            ),
            elevation: WidgetStateProperty.all(10),
          ),
          dropdownMenuEntries: ["Male", "Female", "Other"].map((e) {
            return DropdownMenuEntry(value: e, label: e);
          }).toList(),
        ),
      ],
    );
    ;
  }
}
