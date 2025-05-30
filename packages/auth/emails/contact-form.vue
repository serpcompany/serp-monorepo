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
    Hr
  } from '@vue-email/components';

  interface ContactFormProps {
    name: string;
    email: string;
    subject: string;
    message: string;
  }

  const props = withDefaults(defineProps<ContactFormProps>(), {
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const main = {
    backgroundColor: '#ffffff'
  };

  const container = {
    paddingLeft: '12px',
    paddingRight: '12px',
    margin: '0 auto'
  };

  const h1 = {
    color: '#333',
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '40px 0',
    padding: '0'
  };

  const text = {
    color: '#333',
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: '14px',
    margin: '24px 0'
  };

  const messageBox = {
    backgroundColor: '#f8f9fa',
    border: '1px solid #e9ecef',
    borderRadius: '6px',
    padding: '16px',
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: '14px',
    lineHeight: '1.5',
    whiteSpace: 'pre-wrap',
    color: '#333'
  };

  const infoBox = {
    backgroundColor: '#f8f9fa',
    border: '1px solid #e9ecef',
    borderRadius: '6px',
    padding: '16px',
    margin: '16px 0'
  };

  const label = {
    fontWeight: 'bold',
    color: '#495057',
    fontSize: '14px',
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif"
  };

  const value = {
    color: '#333',
    fontSize: '14px',
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    margin: '4px 0 12px 0'
  };

  const footer = {
    color: '#898989',
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: '12px',
    lineHeight: '22px',
    marginTop: '12px',
    marginBottom: '24px'
  };

  const link = {
    color: '#2754C5',
    textDecoration: 'underline'
  };

  const runtimeConfig = useRuntimeConfig();
</script>

<template>
  <Html>
    <Head />
    <Preview>New contact form submission from {{ name }}</Preview>

    <Body :style="main">
      <Container :style="container">
        <Heading :style="h1">📬 New Contact Form Submission</Heading>

        <Text :style="text">
          You've received a new message through the contact form on
          {{ runtimeConfig.public.siteName }}.
        </Text>

        <div :style="infoBox">
          <div :style="label">From:</div>
          <div :style="value">{{ name }} ({{ email }})</div>

          <div :style="label">Subject:</div>
          <div :style="value">{{ subject || '(No subject)' }}</div>
        </div>

        <div :style="label">Message:</div>
        <div :style="messageBox">{{ message }}</div>

        <Hr
          style="margin: 24px 0; border: none; border-top: 1px solid #e9ecef"
        />

        <Text :style="text">
          To reply to this message, simply respond to {{ email }} directly.
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
            {{ runtimeConfig.public.siteName }} </Link
          >{{
            runtimeConfig.public.APP_DESCRIPTION
              ? `, ${runtimeConfig.public.APP_DESCRIPTION}`
              : ''
          }}
        </Text>
      </Container>
    </Body>
  </Html>
</template>
