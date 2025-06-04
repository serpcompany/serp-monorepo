<script setup lang="ts">
  import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Img,
    Link,
    Preview,
    Text,
  } from '@vue-email/components'

interface EmailVerificationProps {
    verificationCode?: string
  }

  withDefaults(defineProps<EmailVerificationProps>(), {
    verificationCode: '',
  })

const main = {
    backgroundColor: '#ffffff',
  };

  const container = {
    paddingLeft: '12px',
    paddingRight: '12px',
    margin: '0 auto',
  };

  const h1 = {
    color: '#333',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, \'Segoe UI\', \'Roboto\', \'Oxygen\', \'Ubuntu\', \'Cantarell\', \'Fira Sans\', \'Droid Sans\', \'Helvetica Neue\', sans-serif',
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '40px 0',
    padding: '0',
  };

  const link = {
    color: '#2754C5',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, \'Segoe UI\', \'Roboto\', \'Oxygen\', \'Ubuntu\', \'Cantarell\', \'Fira Sans\', \'Droid Sans\', \'Helvetica Neue\', sans-serif',
    fontSize: '14px',
    textDecoration: 'underline',
  };

  const text = {
    color: '#333',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, \'Segoe UI\', \'Roboto\', \'Oxygen\', \'Ubuntu\', \'Cantarell\', \'Fira Sans\', \'Droid Sans\', \'Helvetica Neue\', sans-serif',
    fontSize: '14px',
    margin: '24px 0',
  };

  const footer = {
    color: '#898989',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, \'Segoe UI\', \'Roboto\', \'Oxygen\', \'Ubuntu\', \'Cantarell\', \'Fira Sans\', \'Droid Sans\', \'Helvetica Neue\', sans-serif',
    fontSize: '12px',
    lineHeight: '22px',
    marginTop: '12px',
    marginBottom: '24px',
  };

  const code = {
    display: 'inline-block',
    padding: '16px 4.5%',
    width: '90.5%',
    backgroundColor: '#f4f4f4',
    borderRadius: '5px',
    border: '1px solid #eee',
    color: '#333',
  };

  const runtimeConfig = useRuntimeConfig()
</script>

<template>
  <Html>
    <Head />
    <Preview>Verify your email</Preview>

    <Body :style="main">
      <Container :style="container">
        <Heading :style="h1">
          Verify your email
        </Heading>
        <Link
          :href="`${runtimeConfig.public.siteUrl}/api/auth/verify-account?token=${verificationCode}`"
          target="_blank"
          :style="{ ...link, display: 'block', marginBottom: '16px' }"
        >
          Click here to verify your email
        </Link>
        <Text :style="{ ...text, marginBottom: '14px' }">
          Or, copy and paste this link into your browser:
        </Text>
        <code :style="code">
          {{
            `${runtimeConfig.public.siteUrl}/api/auth/verify-account?token=${verificationCode}`
          }}
        </code>
        <Text
          :style="{
            ...text,
            color: '#ababab',
            marginTop: '14px',
            marginBottom: '16px',
          }"
        >
          If you didn't try to verify your email, you can safely ignore this
          email.
        </Text>
        <Text
          :style="{
            ...text,
            color: '#ababab',
            marginTop: '12px',
            marginBottom: '38px',
          }"
        />
        <Img
          v-if="runtimeConfig.public.LOGO_URL"
          :src="runtimeConfig.public.LOGO_URL"
          width="32"
          alt="Logo"
        />
        <Text :style="footer">
          <Link
            :href="runtimeConfig.public.siteUrl"
            target="_blank"
            :style="{ ...link, color: '#898989' }"
          >
            {{ runtimeConfig.public.siteName }}
          </Link>
          {{
            runtimeConfig.public.APP_DESCRIPTION
              ? `, ${runtimeConfig.public.APP_DESCRIPTION}`
              : ''
          }}
        </Text>
      </Container>
    </Body>
  </Html>
</template>
