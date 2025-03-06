// plugins/tracing.server.ts
import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node';
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { Resource } from '@opentelemetry/resources';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { getWebAutoInstrumentations } from '@opentelemetry/auto-instrumentations-web';
// import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';

export default defineNuxtPlugin(() => {
  // Only run on server-side
  if (!import.meta.server) return;

  const runtimeConfig = useRuntimeConfig();

  const provider = new NodeTracerProvider({
    resource: Resource.default().merge(
      new Resource({
        'service.name': runtimeConfig.public.siteName + '-server'
      })
    )
  });

  const exporterOptions = {
    url: runtimeConfig.public.otelExporterEndpoint
  };

  const traceExporter = new OTLPTraceExporter(exporterOptions);
  provider.addSpanProcessor(new SimpleSpanProcessor(traceExporter));
  provider.register();

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

  // registerInstrumentations({
  //     instrumentations: [
  //         new HttpInstrumentation(),
  //     ],
  // });

  console.log('Server-side tracing service started');
});
