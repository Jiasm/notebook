LIB=exit-on-epipe
AUXTARGETS=test_files/test.json

TARGET=$(LIB).js

.PHONY: all
all: $(TARGET) $(AUXTARGETS)

# task "test"
.PHONY: test mocha
test mocha: test.js
	mocha -R spec -t 20000

# task "lint"
.PHONY: lint
lint: $(TARGET) $(AUXTARGETS)
	jshint --show-non-errors $(TARGET) $(AUXTARGETS)
	jshint --show-non-errors package.json
	jscs $(TARGET) $(AUXTARGETS)

# task "flow"
.PHONY: flow
flow: lint
	flow check --all --show-all-errors
