#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { CcStack } from '../lib/cc-stack';

const app = new cdk.App();
new CcStack(app, 'CcStack');
