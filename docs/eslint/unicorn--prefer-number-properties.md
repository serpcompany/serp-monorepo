# The unicorn/prefer-number-properties Rule

What it does: This rule enforces using Number.isNaN()
instead of the global isNaN().

Why this matters (it's not just stylistic!):
- Global isNaN() coerces values before checking - it
converts the argument to a number first
- Number.isNaN() is stricter - it only returns true for
actual NaN values

Example of the difference:
- isNaN("hello") returns true (string gets coerced to
NaN)
- Number.isNaN("hello") returns false (string is not
NaN)

Recommendation for your API package

Keep this as an error and fix the code. Here's why:

1. It prevents bugs - Your API is doing number
validation, and using the stricter Number.isNaN()
ensures you're actually checking for NaN values, not
just things that coerce to NaN
2. Better type safety - In your validation logic, you
want to be explicit about what you're checking
3. Modern standard - This is the ECMAScript 2015+ way of
  doing things

The fixes are simple - just replace isNaN( with
Number.isNaN( in those 9 locations. This will make your
number validation more predictable and less prone to
unexpected coercion behaviors.
