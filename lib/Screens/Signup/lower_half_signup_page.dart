import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:payment/Screens/Login/login_page.dart';
import 'package:payment/styles.dart';

var requiredFields = [
  ['Mobile Number', 'Enter your mobile number'],
  ['Full Name', 'Enter your full name'],
  ['Citizenship Number', 'Enter your citizenship number'],
  ['Account Number', 'Enter your Bank Account Number'],
  ['MPIN', 'Enter your MPIN'],
];

var requiredOptions = {
  'Tier Selection': ['Tier 0', 'Tier 1', 'Tier 2'],
  'Bank Name': ['Select Bank', 'Everest', 'Global IME', 'Kumari'],
  'Gender': ['Male', 'Female', 'Other'],
};

class LowerHalfSignupPage extends StatefulWidget {
  const LowerHalfSignupPage({super.key});

  @override
  State<LowerHalfSignupPage> createState() => _LowerHalfSignupPageState();
}

class _LowerHalfSignupPageState extends State<LowerHalfSignupPage> {
  final _key = GlobalKey<FormState>();
  Map<String, String> formData = {
    'Tier Selection': 'Tier 0',
    'Gender': 'Male',
    'Bank Name': 'Select Bank',
  };

  void _submitData() {
    print("User Data: $formData");

    if (_key.currentState!.validate()) {
      print(_key.currentState);
    } else {
      return;
    }

    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => LoginPage()),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(left: 20, right: 20, top: 40),
      child: Form(
        key: _key,
        child: Column(
          spacing: 20,
          children: [
            SignupDataInput(
              label: requiredFields[0][0],
              hint: requiredFields[0][1],
              onChanged: (value) {
                formData[requiredFields[0][0]] = value;
              },
            ),
            SignupDataInput(
              label: requiredFields[1][0],
              hint: requiredFields[1][1],
              onChanged: (value) {
                formData[requiredFields[1][0]] = value;
              },
            ),
            SignupDataInput(
              label: requiredFields[4][0],
              hint: requiredFields[4][1],
              onChanged: (value) {
                formData[requiredFields[4][0]] = value;
              },
            ),
            SignupDataOption(
              onSelected: (value) =>
                  setState(() => formData['Gender'] = value ?? 'Male'),
              selectionType: 'Gender',
              selectionOption: requiredOptions['Gender']!,
            ),
            SignupDataOption(
              onSelected: (value) => setState(
                () => formData['Tier Selection'] = value ?? 'Tier 0',
              ),
              selectionType: 'Tier Selection',
              selectionOption: requiredOptions['Tier Selection']!,
            ),
            if (formData['Tier Selection'] != 'Tier 0') ...[
              SignupDataInput(
                label: requiredFields[2][0],
                hint: requiredFields[2][1],
                onChanged: (value) {
                  formData[requiredFields[2][0]] = value;
                },
              ),
            ],
            if (formData['Tier Selection'] == 'Tier 2') ...[
              SignupDataOption(
                onSelected: (value) =>
                    formData['Bank Name'] = value ?? 'Error Bank Selection',
                selectionType: 'Bank Name',
                selectionOption: requiredOptions['Bank Name']!,
              ),
            ],
            if (formData['Tier Selection'] == 'Tier 2') ...[
              SignupDataInput(
                label: requiredFields[3][0],
                hint: requiredFields[3][1],
                onChanged: (value) {
                  formData[requiredFields[3][0]] = value;
                },
              ),
            ],
            ProceedButton(onPressed: _submitData),
          ],
        ),
      ),
    );
  }
}

class SignupDataInput extends StatefulWidget {
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
  State<SignupDataInput> createState() => _SignupDataInputState();
}

class _SignupDataInputState extends State<SignupDataInput> {
  bool _isObscured = true;
  @override
  Widget build(BuildContext context) {
    bool isPassword = widget.label == "MPIN";
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(widget.label),
        TextFormField(
          keyboardType:
              widget.label == 'Mobile Number' || widget.label == 'MPIN'
              ? TextInputType.number
              : null,
          inputFormatters:
              widget.label == 'Mobile Number' || widget.label == 'MPIN'
              ? [FilteringTextInputFormatter.digitsOnly]
              : null,
          maxLength: widget.label == 'MPIN'
              ? 4
              : widget.label == 'Mobile Number'
              ? 10
              : null,
          validator: (context) {
            if (context == null || context.isEmpty) {
              return "Please enter your ${widget.label}";
            }
            return null;
          },
          obscureText: isPassword ? _isObscured : false,
          decoration: InputDecoration(
            suffixIcon: isPassword
                ? IconButton(
                    onPressed: () {
                      setState(() {
                        _isObscured = !_isObscured;
                      });
                    },
                    icon: Icon(
                      _isObscured ? Icons.visibility_off : Icons.visibility,
                    ),
                  )
                : null,
            filled: true,
            fillColor: Styles.fillColor,
            hintText: widget.hint,
            hintStyle: TextStyle(color: Colors.grey),
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(10),
              borderSide: BorderSide.none,
            ),
            focusedBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(10),
              borderSide: BorderSide(color: Styles.primaryColor, width: 2),
            ),
            errorBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(10),
              borderSide: BorderSide(color: Styles.errorColor, width: 2),
            ),
          ),
          onChanged: widget.onChanged,
        ),
      ],
    );
  }
}

class SignupDataOption extends StatelessWidget {
  final String selectionType;
  final List<String> selectionOption;
  final ValueChanged<String?> onSelected;

  const SignupDataOption({
    super.key,
    required this.onSelected,
    required this.selectionType,
    required this.selectionOption,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(selectionType),
        DropdownMenu<String>(
          onSelected: onSelected,
          initialSelection: selectionOption[0],
          width: MediaQuery.of(context).size.width * 0.9,
          inputDecorationTheme: InputDecorationTheme(
            filled: true,
            fillColor: Styles.fillColor,
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(10),
              borderSide: BorderSide.none,
            ),
          ),
          menuStyle: MenuStyle(
            backgroundColor: WidgetStateProperty.all(Color(0xFF1E1E1E)),
            shape: WidgetStateProperty.all(
              RoundedRectangleBorder(borderRadius: BorderRadius.circular(15)),
            ),
            elevation: WidgetStateProperty.all(10),
          ),
          dropdownMenuEntries: selectionOption.map((e) {
            return DropdownMenuEntry(value: e, label: e);
          }).toList(),
        ),
      ],
    );
  }
}

class ProceedButton extends StatelessWidget {
  final VoidCallback? onPressed;

  const ProceedButton({super.key, this.onPressed});

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: MediaQuery.of(context).size.width,
      height: 50,
      child: ElevatedButton(
        style: ElevatedButton.styleFrom(
          backgroundColor: Colors.deepPurple,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(15),
          ),
        ),
        onPressed: onPressed,
        child: Text("PROCEED", style: TextStyle()),
      ),
    );
  }
}
