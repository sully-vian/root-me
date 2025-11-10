# [AST - Deobfuscation](https://www.root-me.org/fr/Challenges/Web-Client/AST-Deobfuscation)

The challenge is to reverse an AST back to the original code to run it and obtain the key password.

## Usage

To print the generated code:

```bash
$ node reverse.js <json-ast-file>
```

You can redirect this to a file or directly run it with node:

```bash
$ node reverse.js ch38.json | node
```

