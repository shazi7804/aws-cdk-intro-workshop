# AWS CDK Intro WorkShop

## Environment

- [AWS Cloud9](https://aws.amazon.com/cloud9/)
-

## WorkShop

**If you not use `Cloud9` environment, please this step first [How to install CDK](how-to-install-cdk)**

### CDK project initial 

1. Checking your environment and up to date version.

```
$ cdk --version
```

2. Create an empty directory on your system

```
$ mkdir cdk-intro-workshop && cd cdk-intro-workshop
```

3. We will `use cdk init` to create a new TypeScript CDK project:

```
$ cdk init sample-app --language typescript
```

### Project Structure

```bash
.
├── bin
│   └── cdk-workshop.ts
├── cdk.json
├── jest.config.js
├── lib
│   └── cdk-workshop-stack.ts
├── package.json
├── package-lock.json
├── README.md
├── test
│   └── cdk-workshop.test.ts
└── tsconfig.json
```

- `lib/cdk-workshop-stack.ts` is where your CDK application’s main stack is defined. This is the file we’ll be spending most of our time in.
- `bin/cdk-workshop.ts` is the entrypoint of the CDK application. It will load the stack defined in `lib/cdk-workshop-stack.ts`
- `package.json` is your npm module manifest. It includes information like the name of your app, version, dependencies and build scripts like “watch” and “build” (`package-lock.json` is maintained by npm)
- `cdk.json` tells the toolkit how to run your app. In our case it will be `"npx ts-node bin/cdk-workshop.ts"`
- `tsconfig.json` your project’s typescript configuration
- `.gitignore` and `.npmignore` tell git and npm which files to include/exclude from source control and when publishing this module to the package manager.
- `node_modules` is maintained by npm and includes all your project’s dependencies.

### cdk synth

AWS CDK apps are effectively only a definition of your infrastructure using code. When CDK apps are executed, they produce (or “synthesize”, in CDK parlance) an AWS CloudFormation template for each stack defined in your application.

```
$ cdk synth
```

Will output the following CloudFormation template:

```
Resources:
  CdkWorkshopQueue50D9D426:
    Type: AWS::SQS::Queue
    Properties:
      VisibilityTimeout: 300
    Metadata:
      aws:cdk:path: CdkWorkshopStack/CdkWorkshopQueue/Resource
  CdkWorkshopQueuePolicyAF2494A5:
    Type: AWS::SQS::QueuePolicy
    Properties:
      PolicyDocument:
        Statement:
          - Action: sqs:SendMessage
            Condition:
              ArnEquals:
                aws:SourceArn:
                  Ref: CdkWorkshopTopicD368A42F
```

As you can see, this template includes four resources:

- **AWS::SQS::Queue** - our queue
- **AWS::SNS::Topic** - our topic
- **AWS::SNS::Subscription** - the subscription between the queue and the topic
- **AWS::SQS::QueuePolicy** - the IAM policy which allows this topic to send messages to the queue

### cdk diff

Before deploy, confirm the difference before and after changes.

```
$ cdk diff
```

Will output the following resources changes:

```diff
Stack CdkWorkshopStack
IAM Statement Changes
┌───┬─────────────────┬────────┬─────────────────┬─────────────────┬────────────────────┐
│   │ Resource        │ Effect │ Action          │ Principal       │ Condition          │
├───┼─────────────────┼────────┼─────────────────┼─────────────────┼────────────────────┤
│ + │ ${CdkWorkshopQu │ Allow  │ sqs:SendMessage │ Service:sns.ama │ "ArnEquals": {     │
│   │ eue.Arn}        │        │                 │ zonaws.com      │   "aws:SourceArn": │
│   │                 │        │                 │                 │  "${CdkWorkshopTop │
│   │                 │        │                 │                 │ ic}"               │
│   │                 │        │                 │                 │ }                  │
└───┴─────────────────┴────────┴─────────────────┴─────────────────┴────────────────────┘
(NOTE: There may be security-related changes not in this list. See https://github.com/aws/aws-cdk/issues/1299)

Conditions
... skip

Resources
[+] AWS::SQS::Queue CdkWorkshopQueue CdkWorkshopQueue50D9D426 
[+] AWS::SQS::QueuePolicy CdkWorkshopQueue/Policy CdkWorkshopQueuePolicyAF2494A5 
[+] AWS::SNS::Subscription CdkWorkshopQueue/CdkWorkshopStackCdkWorkshopTopicD7BE9643 CdkWorkshopQueueCdkWorkshopStackCdkWorkshopTopicD7BE96438B5AD106 
[+] AWS::SNS::Topic CdkWorkshopTopic CdkWorkshopTopicD368A42F
```

### cdk bootstrap

The first time you deploy an AWS CDK app into an environment (account/region), you’ll need to install a “bootstrap stack”. This stack includes resources that are needed for the toolkit’s operation. For example, the stack includes an S3 bucket that is used to store templates and assets during the deployment process.

```
```

### cdk deploy



## How to install CDK




