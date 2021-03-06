module.exports = {
	"root": true,
	"extends": "airbnb",
	"env": {
		"es6": true,
		"browser": true,
		"node": true,
		"jest": true
	},
	"parser": "babel-eslint",
	"plugins": [],
	"parserOptions": {
		"ecmaVersion": 2018,
		"ecmaFeatures": {
			"impliedStrict": true
		}
	},
	"rules": {
		"comma-dangle": [ "error", "only-multiline" ],
		"semi": ["error", "always"],
		"func-names": 0,
		"eqeqeq": 0,
		"no-plusplus": 0,
		"prefer-destructuring": [
			"error",
			{
				"array": false,
				"object": false
			}
		],
		"no-param-reassign": [
			"error",
			{
				"props": false
			}
		],
		"quotes": [ 2, "single" ],
		"no-console": 0,
		"no-restricted-syntax": 0,
		"max-len": [
			2,
			{
				"code": 500
			}
		],
		"no-return-assign": 0
	},
	"settings": {
		"import/resolver": {
			"alias": {
				"extensions": [ ".js", ".jsx", ".json", ".vue" ]
			}
		}
	}
}
