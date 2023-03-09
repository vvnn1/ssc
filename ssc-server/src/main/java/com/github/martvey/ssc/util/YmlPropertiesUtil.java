package com.github.martvey.ssc.util;

import org.springframework.core.CollectionFactory;
import org.springframework.lang.Nullable;
import org.springframework.util.StringUtils;
import org.yaml.snakeyaml.DumperOptions;
import org.yaml.snakeyaml.Yaml;

import java.util.*;
import java.util.function.Function;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class YmlPropertiesUtil {
    private final static Pattern PATTERN = Pattern.compile("(.*)\\[(\\d+)]");

    public static String toYml(Object o){
        return getYaml().dumpAsMap(o);
    }

    public static Properties yml2Properties(Map<String,Object> ... map){
        Properties result = CollectionFactory.createStringAdaptingProperties();
        for (Map<String, Object> ymlMap : map) {
            result.putAll(getFlattenedMap(ymlMap));
        }
        return result;
    }

    public static Properties yml2Properties(String yml){
        Yaml yaml = new Yaml();
        Properties result = CollectionFactory.createStringAdaptingProperties();
        for (Object o : yaml.loadAll(yml)) {
            result.putAll(getFlattenedMap(asMap(o)));
        }
        return result;
    }

    public static String properties2Yml(Properties properties){
        Map<String, Object> result = new HashMap<>();
        for (String name : properties.stringPropertyNames()) {
            LinkedList<String> queue = new LinkedList<>(Arrays.asList(name.split("\\.")));
            addYmlNode(queue,properties.getProperty(name),result);
        }
        return getYaml().dump(result);
    }

    private static Yaml getYaml(){
        DumperOptions dumperOptions = new DumperOptions();
        dumperOptions.setDefaultFlowStyle(DumperOptions.FlowStyle.BLOCK);
        dumperOptions.setDefaultScalarStyle(DumperOptions.ScalarStyle.PLAIN);
        dumperOptions.setLineBreak(DumperOptions.LineBreak.UNIX);
        return new Yaml(dumperOptions);
    }

    private static void addYmlNode(Queue<String> path, String value, Map<String,Object> result){
        String head = path.poll();
        if (head == null)
            return;
        Matcher matcher = PATTERN.matcher(head);
        if (matcher.matches()) {
            String key = head.replaceFirst("\\[\\d+]", "");
            @SuppressWarnings("unchecked")
            List<Object> list = (List<Object>) result.computeIfAbsent(key, s -> new ArrayList<>());
            if (path.size() > 0){
                int index = Integer.parseInt(matcher.group(2));
                @SuppressWarnings("unchecked")
                Map<String,Object> tmp = (Map<String, Object>) list_computeIfAbsent(list,index, i -> new HashMap<String, Object>());
                addYmlNode(path,value,tmp);
            }else{
                list.add(asObject(value));
            }
        }else{
            if (path.size() > 0){
                @SuppressWarnings("unchecked")
                Map<String,Object> tmp = (Map<String, Object>) result.computeIfAbsent(head, s -> new HashMap<String, Object>());
                addYmlNode(path,value,tmp);
            }else{
                result.put(head,asObject(value));
            }
        }
    }

    private static Object list_computeIfAbsent(List<Object> list, int index, Function<Integer,Object> function){
        Object v;
        if (index < list.size() && (v = list.get(index)) != null){
            return v;
        }
        if ((v = function.apply(index)) != null) {
            list.add(index,v);
            return v;
        }
        return null;
    }

    public static Object asObject(String value) {
        if ("true".equalsIgnoreCase(value) || "false".equalsIgnoreCase(value)) {
            return Boolean.valueOf(value);
        } else if("[]".equals(value)) {
            return Collections.emptyList();
        } else {
            try {return Integer.parseInt(value);} catch (NumberFormatException ignored) {}
            try {return Long.parseLong(value);} catch (NumberFormatException ignored) {}
            try {return Double.parseDouble(value);} catch (NumberFormatException ignored) {}
            return value;
        }
    }


    private static Map<String, Object> asMap(Object object) {
        Map<String, Object> result = new LinkedHashMap<>();

        @SuppressWarnings("unchecked")
        Map<Object, Object> map = (Map<Object, Object>) object;
        map.forEach((key, value) -> {
            if (value instanceof Map) {
                value = asMap(value);
            }
            if (key instanceof CharSequence) {
                result.put(key.toString(), value);
            }
            else {
                result.put("[" + key.toString() + "]", value);
            }
        });
        return result;
    }

    private static Map<String, Object> getFlattenedMap(Map<String, Object> source) {
        Map<String, Object> result = new LinkedHashMap<>();
        buildFlattenedMap(result, source, null);
        return result;
    }

    private static void buildFlattenedMap(Map<String, Object> result, Map<String, Object> source, @Nullable String path) {
        source.forEach((key, value) -> {
            if (StringUtils.hasText(path)) {
                if (key.startsWith("[")) {
                    key = path + key;
                }
                else {
                    key = path + '.' + key;
                }
            }
            if (value instanceof String) {
                result.put(key, value);
            }
            else if (value instanceof Map) {
                @SuppressWarnings("unchecked")
                Map<String, Object> map = (Map<String, Object>) value;
                buildFlattenedMap(result, map, key);
            }
            else if (value instanceof Collection) {
                @SuppressWarnings("unchecked")
                Collection<Object> collection = (Collection<Object>) value;
                if (collection.isEmpty()) {
                    result.put(key, "");
                }
                else {
                    int count = 0;
                    for (Object object : collection) {
                        buildFlattenedMap(result, Collections.singletonMap(
                                "[" + (count++) + "]", object), key);
                    }
                }
            }
            else {
                result.put(key, (value != null ? String.valueOf(value) : ""));
            }
        });
    }
}
