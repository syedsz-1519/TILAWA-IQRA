import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:hive_flutter/hive_flutter.dart';
import 'package:go_router/go_router.dart';

import 'config/app_config.dart';
import 'config/routes.dart';
import 'config/theme.dart';
import 'services/local_storage_service.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Initialize Hive for local storage
  await Hive.initFlutter();

  // Initialize localization
  await EasyLocalization.ensureInitialized();

  // Initialize app configuration
  await AppConfig.initialize();

  runApp(
    EasyLocalization(
      supportedLocales: const [
        Locale('en'),
        Locale('ar'),
        Locale('ur'),
        Locale('hi'),
        Locale('ta'),
        Locale('bn'),
        Locale('tr'),
        Locale('id'),
        Locale('ms'),
        Locale('fa'),
        Locale('kk'),
      ],
      path: 'assets/translations',
      fallbackLocale: const Locale('en'),
      child: const ProviderScope(
        child: TilawaApp(),
      ),
    ),
  );
}

class TilawaApp extends ConsumerWidget {
  const TilawaApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final theme = ref.watch(themeProvider);
    final locale = EasyLocalization.of(context)?.locale ?? const Locale('en');

    return MaterialApp.router(
      title: 'TILAWA',
      localizationsDelegates: context.localizationDelegates,
      supportedLocales: context.supportedLocales,
      locale: locale,
      theme: AppTheme.lightTheme,
      darkTheme: AppTheme.darkTheme,
      themeMode: theme,
      routerConfig: appRouter,
      debugShowCheckedModeBanner: false,
    );
  }
}
