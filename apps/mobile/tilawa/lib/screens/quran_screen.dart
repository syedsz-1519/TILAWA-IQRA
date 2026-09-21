import 'package:flutter/material.dart';

class QuranScreen extends StatelessWidget {
  const QuranScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Quran')),
      body: ListView.builder(
        itemCount: 114,
        itemBuilder: (context, index) {
          return ListTile(
            leading: CircleAvatar(child: Text('${index + 1}')),
            title: Text('Surah ${index + 1}'),
            subtitle: const Text('Tap to read and listen'),
            trailing: const Icon(Icons.arrow_forward),
            onTap: () {},
          );
        },
      ),
    );
  }
}

class SurahDetailScreen extends StatelessWidget {
  final int surahNumber;
  const SurahDetailScreen({Key? key, required this.surahNumber}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Surah $surahNumber')),
      body: const Center(child: Text('Surah content goes here')),
    );
  }
}
