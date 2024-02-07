# App Name (Idk what name will have this)

- [Mini Tutorial](#mini-tutorial)
- [Documentation](#documentation)

## Mini Tutorial
The app have two editors, the left editor is the **Setup** section, and the right editor is the **Loop** section.

### Setup Editor
It is for declare the instruments, assign those in variables, set its effects and playing modes, etc. This code section is before of the music loop, therefore, here is to write all the code of you want non repetitive. Like this:
```js
  const oscillator = new Osc("triangle")
    .chord(["c3", "e3", "g3"])
    .filter(1500)
```

### Loop Editor
It is for execute the code to the beat you choose, principally, for playing the instruments you set before, or handle variables for affect the instruments or whatever. Your creativity is most important than the rules. ;)

For play the instrument before declared, only with the **play()** method will works. Like this:
```js
oscillator.play()
```

With this code, you will play a simple C major chord using triangle waves, this will repeated in each beat in loop.

## Documentation
Coming soon...

