# customizedRouterLink
This is a customized router link for angular2 mobile side
//测试
This is a customized router link for angular2 mobile side.
<br>This routerLink could resolve a function first and then do the navigation. 
<br>It can also be used as a normal nsRouterLink.
<br>To use this routerLink, pleace put your function as the last parameter in the list or use it.

##### To use as an usual nsRouterLink
```
<Button text="TextSignup" [wasabiRouterLink]="[testVal]"></Button>
```

##### To use with function
```
onTest() {
  alert("alert");
}

<Button text="TextSignup" [wasabiRouterLink]="[testVal, onTest]"></Button>
```
