module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ["plugin:vue/essential", "eslint:recommended"],
    rules: {
        "generator-star-spacing": "off",
        indent: ["error", 4],
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-useless-escape": "off"
    },
    parserOptions: {
        parser: "babel-eslint"
    }
};
