default: install lint test fonts/stylesheets/stylesheet.css

install:
	npm install

lint:
	npx eslint *.js modules/*.js

test:
	npx jsonschema validate fonts-schema.json fonts.json

fonts/stylesheets/stylesheet.css: fonts/stylesheets/fonts.less
	npx lessc $^ $@

list:
	uvx python listing.py

serve:
	open "http://localhost:8000"
	uvx python -m http.server
