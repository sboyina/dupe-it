#!/usr/bin/env node
import { startApp } from './proxy-server';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

yargs(hideBin(process.argv))
    .command('start',
        'to start a proxy',
        (yargs) => {
            yargs.options({
                target: {
                    describe: "host to target",
                    type: 'string',
                    alias: 't',
                },
                port: {
                    describe: "port on which proxy should run",
                    type: 'string',
                    alias: 'p',
                    default: '4444'
                }
            });
        }, (argv: any) => {
            startApp({port: argv.port, target: argv.target})
        }).argv;