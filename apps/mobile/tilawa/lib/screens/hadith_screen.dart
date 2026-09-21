import 'package:flutter/material.dart';

class HadithScreen extends StatelessWidget {
  const HadithScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Hadith')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          _buildCollectionCard(context, 'Sahih Al-Bukhari', '7563 Hadith'),
          _buildCollectionCard(context, 'Sahih Muslim', '7275 Hadith'),
          _buildCollectionCard(context, 'Jami\' at-Tirmidhi', '3956 Hadith'),
          _buildCollectionCard(context, 'Sunan Ibn Majah', '4341 Hadith'),
        ],
      ),
    );
  }

  Widget _buildCollectionCard(BuildContext context, String name, String count) {
    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      child: ListTile(
        title: Text(name),
        subtitle: Text(count),
        trailing: const Icon(Icons.arrow_forward),
        onTap: () {},
      ),
    );
  }
}

class HadithDetailScreen extends StatelessWidget {
  final String collectionId;
  const HadithDetailScreen({Key? key, required this.collectionId}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Collection')),
      body: const Center(child: Text('Hadith content goes here')),
    );
  }
}
