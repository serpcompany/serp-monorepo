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
  } from '@vue-email/components';

  interface LoginNotificationProps {
    userName?: string;
    city?: string;
    country?: string;
  }

  withDefaults(defineProps<LoginNotificationProps>(), {
    userName: '',
    city: '',
    country: '',
  });

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
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '40px 0',
    padding: '0',
  };

  const link = {
    color: '#2754C5',
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: '14px',
    textDecoration: 'underline',
  };

  const text = {
    color: '#333',
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: '14px',
    margin: '24px 0',
  };

  const footer = {
    color: '#898989',
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: '12px',
    lineHeight: '22px',
    marginTop: '12px',
    marginBottom: '24px',
  };

  const runtimeConfig = useRuntimeConfig();
</script>

<template>
  <Html>
    <Head />
    <Preview>Login from a new location</Preview>

    <Body :style="main">
      <Container :style="container">
        <Heading :style="h1">
          Login from a new location
        </Heading>
        <Text :style="text">
          Hello {{ userName }},
        </Text>
        <Text :style="text">
          We noticed a login to your {{ runtimeConfig.public.siteName }} account
          from a new location.
        </Text>
        <Text v-if="city && country" :style="text">
          Location: {{ city }}, {{ country }}
        </Text>
        <Text :style="text">
          If this was you, you may disregard this email.
        </Text>
        <Text :style="text">
          If this wasn't you, you should immediately
          <Link
            :href="`${runtimeConfig.public.siteUrl}/auth/forgot-password/`"
            target="_blank"
            :style="link"
          >
            change your {{ runtimeConfig.public.siteName }} account password
          </Link>
        </Text>
        <Text :style="text">
          Thanks,
          <br />
          {{ runtimeConfig.public.siteName }} team
        </Text>
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
