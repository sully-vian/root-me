data = require(`./${process.argv[2]}`);

function mapAndJoin(array, separator) {
	try {
		const processed = array.map(main);
		const joined = processed.join(separator);
		return joined;
	} catch (error) {
		console.error(error);
		console.log(array);
	}
}

function main(obj) {
	switch (obj.type) {
		case "ArrayExpression": {
			const { elements } = obj;
			return `[${mapAndJoin(elements, ",")}]`;

		}
		case "ArrowFunctionExpression": {
			const { id, async, params, body } = obj;
			const idString = id ? main(id) : "";
			const asyncString = async ? "async " : "";
			const processedParams = mapAndJoin(params, ",");
			return `(${asyncString}${idString}(${processedParams})=>${main(body)})`;

		}
		case "AssignmentExpression": {
			const { operator, left, right } = obj;
			return `${main(left)} ${operator} ${main(right)}`;

		}
		case "BinaryExpression": {
			const { left, right, operator } = obj;
			return `( (${main(left)}) ${operator} (${main(right)}) )`;

		}
		case "BlockStatement": {
			const { body } = obj;
			const processedBody = mapAndJoin(body, ";");
			return `{${processedBody}}`;

		}
		case "CallExpression": {
			const { callee, arguments } = obj;
			const processedArgs = mapAndJoin(arguments, ",");
			return `(${main(callee)}(${processedArgs}))`;

		}
		case "ExpressionStatement": {
			const { expression } = obj;
			return `${main(expression)}`;

		}
		case "FunctionDeclaration": {
			const { id, async, params, body } = obj;
			const asyncString = async ? "async " : "";
			const processedParams = mapAndJoin(params, ",");
			return `${asyncString}function ${main(id)}(${processedParams})${main(body)}`;

		}
		case "FunctionExpression": {
			const { id, async, params, body } = obj;
			const idString = id ? main(id) : "";
			const asyncString = async ? "async " : "";
			const processedParams = mapAndJoin(params, ",");
			return `${asyncString}function ${idString}(${processedParams})${main(body)}`;
		}
		case "Identifier": {
			const { name } = obj;
			return `${name}`;

		}
		case "IfStatement": {
			const { test, consequent, alternate } = obj;
			const alternateString = alternate ? main(alternate) : "";
			return `if (${main(test)}) ${main(consequent)} ${alternate ? `else ${alternateString}` : ""}`;

		}
		case "Literal": {
			const { raw } = obj;
			return `${raw} `;
		}
		case "MemberExpression": {
			const { object, property } = obj;
			return `${main(object)}.${main(property)} `;
		}
		case "Program": {
			const { body } = obj;
			const processedBody = mapAndJoin(body, ";");
			return processedBody;

		}
		case "ReturnStatement": {
			const { argument } = obj;
			return `return ${main(argument)} `;

		}
		case "VariableDeclaration": {
			const { declarations, kind } = obj;
			const processedDeclarations = mapAndJoin(declarations, ",")
			return `${kind} ${processedDeclarations} `;

		}
		case "VariableDeclarator": {
			const { id, init } = obj;
			return `${main(id)} = ${main(init)} `;

		}
		case "jaajajajajajajajajajajajaj": {
			return `/* FINISHED */`;

		}
	}
	console.log(`Unmanaged type: ${obj.type} `);
	//console.log(`obj: "${obj}"`);
	console.log(`fields: ${Object.keys(obj)} `);
	process.exit();
}

console.log(main(data));
