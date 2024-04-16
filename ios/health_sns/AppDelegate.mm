#import "AppDelegate.h"
#import "RNSplashScreen.h"
#import <React/RCTBundleURLProvider.h>
#import <Firebase.h>
#import <RNKakaoLogins.h>
#import <NaverThirdPartyLogin/NaverThirdPartyLoginConnection.h> // 이 부분을 상단으로 이동

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
            options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options 
{
    // for naver login
    if ([url.scheme isEqualToString:@"http://ShareBBy.com/login"]) {
        return [[NaverThirdPartyLoginConnection getSharedInstance] application:application openURL:url options:options];
    } else if([RNKakaoLogins isKakaoTalkLoginUrl:url]) {
        return [RNKakaoLogins handleOpenUrl: url];
    }
    
    return NO;
}

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    [FIRApp configure];
    self.moduleName = @"health_sns";
    // You can add your custom initial props in the dictionary below.
    // They will be passed down to the ViewController used by React Native.
    self.initialProps = @{};
    BOOL ret = [super application:application didFinishLaunchingWithOptions:launchOptions];
    if (ret == YES)
    {
        [RNSplashScreen show];
    }
    return ret;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
    return [self getBundleURL];
}

- (NSURL *)getBundleURL
{
#if DEBUG
    return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
    return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
