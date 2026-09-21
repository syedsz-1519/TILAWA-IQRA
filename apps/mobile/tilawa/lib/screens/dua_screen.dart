import 'package:flutter/material.dart';

class DuaScreen extends StatelessWidget {
  const DuaScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Duas')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          _buildDuaCard(context, 'Morning Duas', '12 duas'),
          _buildDuaCard(context, 'Evening Duas', '8 duas'),
          _buildDuaCard(context, 'Daily Duas', '25 duas'),
          _buildDuaCard(context, 'Duas for Health', '15 duas'),
          _buildDuaCard(context, 'Duas for Success', '20 duas'),
        ],
      ),
    );
  }

  Widget _buildDuaCard(BuildContext context, String title, String count) {
    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      child: ListTile(
        title: Text(title),
        subtitle: Text(count),
        trailing: const Icon(Icons.arrow_forward),
        onTap: () {},
      ),
    );
  }
}
