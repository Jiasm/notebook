/* vim: set ts=2: */
var X;
var modp = './';
var assert = require("assert");
var exec = require("child_process").exec;

describe('source',function(){it('should load',function(){X=require(modp);});});

function asseq(x,y,msg) { assert.equal(x,y, msg + ": |" + x + "| == |" + y + "|"); }
function assneq(x,y,msg) { assert.notEqual(x,y, msg + ": |" + x + "| != |" + y + "|"); }

function checkstd(stdout, stderr, opts) {
	if(opts.out != null) asseq(stdout, opts.out, "stdout");
	else if(opts.nout != null) assneq(stdout, opts.nout, "stdout");
	if(opts.err != null) asseq(stderr, opts.err, "stderr");
	else if(opts.nerr != null) assneq(stderr, opts.nerr, "stderr");
}

function nthrow(cmd, opts) {
	it(opts.msg, function(done) {
		exec(cmd, function(err,stdout,stderr) {
			assert.equal(err, null);
			checkstd(stdout, stderr, opts);
			done();
		});
	});
}

function ythrow(cmd, opts) {
	it(opts.msg, function(done) {
		exec(cmd, function(err,stdout,stderr) {
			assert.notEqual(err, null);
			if(opts.errmsg) assert.notEqual(err.message.match(opts.errmsg), null, "Could not find /" + opts.errmsg + "/ in error message");
			checkstd(stdout, stderr, opts);
			done();
		});
	});
}

function doit(test) {
	if(!test || !test.cmd) return;
	var cmd = "bash test_files/runner.sh " + test.cmd;
	var basecmd = cmd.replace(/௳/,"");
	var testcmd = cmd.replace(/௳/,"test");
	var passopts = {out:test.output, err:""};
	var failopts = {out:test.output, nerr:"", errmsg:test.errmsg};
	describe(test.desc || test.cmd, function() {	
		if(test.tfail) {
			failopts.msg = "should throw with module";
			ythrow(testcmd, failopts);
		} else {
			passopts.msg = "should not throw with module";
			nthrow(testcmd, passopts);
		}
		
		if(test.pass) {
			passopts.msg = "should not throw normally";
			nthrow(basecmd, passopts);
		} else {
			failopts.msg = "should throw normally";
			ythrow(basecmd, failopts);
		}
	});
}

var tests = require("./test_files/test.json");
tests.forEach(doit);
