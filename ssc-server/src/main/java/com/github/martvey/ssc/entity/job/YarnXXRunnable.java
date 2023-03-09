package com.github.martvey.ssc.entity.job;

import org.apache.flink.api.common.JobID;
import org.apache.flink.api.dag.Pipeline;
import org.apache.flink.client.program.PackagedProgram;
import org.apache.flink.client.program.PackagedProgramUtils;
import org.apache.flink.client.program.ProgramInvocationException;
import org.apache.flink.configuration.ConfigUtils;
import org.apache.flink.configuration.Configuration;
import org.apache.flink.configuration.CoreOptions;
import org.apache.flink.configuration.PipelineOptions;
import org.apache.flink.core.execution.DefaultExecutorServiceLoader;
import org.apache.flink.core.execution.PipelineExecutorFactory;
import org.apache.flink.core.fs.FileSystem;
import org.apache.flink.core.fs.Path;
import org.apache.flink.util.FileUtils;
import org.apache.flink.util.FlinkRuntimeException;
import org.apache.flink.util.Preconditions;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.List;
import java.util.function.Supplier;

import static com.github.martvey.ssc.util.PipelineJarUtil.downloadJar;
import static org.apache.flink.client.deployment.application.ApplicationConfiguration.APPLICATION_ARGS;


public class YarnXXRunnable implements Supplier<JobID> {
    private final PackagedProgram packagedProgram;
    private final File jarFile;
    private final Configuration configuration;

    public YarnXXRunnable(JobDetail jobDetail) throws IOException, ProgramInvocationException {
        this.configuration = jobDetail.getSourceConfiguration();
        List<String> pipelineJars = configuration.get(PipelineOptions.JARS);
        String[] args = ConfigUtils.decodeListFromConfig(configuration, APPLICATION_ARGS, String::new)
                .toArray(new String[0]);


        Preconditions.checkArgument(pipelineJars.size() == 1, "只能有一个pipelineJar");

        String pipelineJar = pipelineJars.get(0);
        this.jarFile = downloadJar(pipelineJar);
        this.packagedProgram = PackagedProgram.newBuilder()
                .setJarFile(jarFile)
                .setArguments(args)
                .setConfiguration(configuration)
                .build();

        ConfigUtils.encodeCollectionToConfig(configuration, PipelineOptions.JARS, packagedProgram.getJobJarAndDependencies(), Object::toString);
    }

    @Override
    public JobID get(){
        PipelineExecutorFactory executorFactory = new DefaultExecutorServiceLoader().getExecutorFactory(configuration);
        Integer defaultLocalParallelism = configuration.get(CoreOptions.DEFAULT_PARALLELISM);
        try {
            Pipeline pipeline = PackagedProgramUtils.getPipelineFromProgram(packagedProgram, configuration, defaultLocalParallelism, true);
            return executorFactory
                    .getExecutor(configuration)
                    .execute(pipeline, configuration, packagedProgram.getUserCodeClassLoader())
                    .get()
                    .getJobID();
        } catch (Exception e) {
            throw new FlinkRuntimeException("启动job失败", e);
        } finally {
            if (packagedProgram != null){
                packagedProgram.deleteExtractedLibraries();
            }
            jarFile.delete();
        }
    }
}
