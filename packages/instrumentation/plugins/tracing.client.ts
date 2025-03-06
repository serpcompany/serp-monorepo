// plugins/tracing.client.ts
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { ZoneContextManager } from '@opentelemetry/context-zone';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { getWebAutoInstrumentations } from '@opentelemetry/auto-instrumentations-web';
import { Resource } from '@opentelemetry/resources';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';

export default defineNuxtPlugin(() => {
  // Only run on client-side
  if (import.meta.server) return;

  const runtimeConfig = useRuntimeConfig();

  const provider = new WebTracerProvider({
    resource: Resource.default().merge(
      new Resource({
        'service.name': runtimeConfig.public.siteName + '-client'
      })
    )
  });

  const exporterOptions = {
    url: runtimeConfig.public.otelExporterEndpoint
  };

  const traceExporter = new OTLPTraceExporter(exporterOptions);
  provider.addSpanProcessor(new SimpleSpanProcessor(traceExporter));

  provider.register({
    contextManager: new ZoneContextManager()
  });

  // Registering instrumentations
  registerInstrumentations({
    instrumentations: [
      getWebAutoInstrumentations({
        // Configuration options for specific instrumentations
        '@opentelemetry/instrumentation-fetch': {
          propagateTraceHeaderCorsUrls: [
            /.+/g // Propagate to all URLs
          ]
        }
      })
    ]
  });

  console.log('Tracing service started');
});
