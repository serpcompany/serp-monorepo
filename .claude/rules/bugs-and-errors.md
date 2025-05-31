---
description: How to deal with errors
alwaysApply: true
---

When you encounter an error or an issue, as in something is literally throwing an error or something that you're working on doesn't seem to be giving the correct response or output. Follow this procedure:

1. Do not start trying to fix it. Instead, identify the known information and come up with a list of possible reasons why it could be happening and what the steps would be in order to systematically debug those instead of guess.
2. then you can begin to verify your hypotheses by searching for errors and documentation and known issues online for each of the things you thought might be causing the problem.
3. use that knowledge to further expand on why the error might be happening and create a list of things to check that may give us more information that can be used to fix it.
4. Once the error has been fixed, do not go on to the next task. Instead, write down a list of things that could have prevented this, And mark which ones we don't have in our project so we can create them.
5. Then implement those measures to prevent it in the future, including adding type safety or writing tests, etc.
6. Only then, after the tests are written and passing and checked for false positives and false negatives, can we consider this task completed, at which point we should make a commit.