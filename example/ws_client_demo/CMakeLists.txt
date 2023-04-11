cmake_minimum_required(VERSION 3.4.1...3.17.2)
set(CMAKE_BUILD_TYPE MinSizeRel)

project(demo C CXX)

set (CMAKE_CXX_STANDARD 11)
set (CXX_STANDARD_REQUIRED ON)
set (CMAKE_CXX_EXTENSIONS OFF)
set (CMAKE_EXPORT_COMPILE_COMMANDS yes)

if (${CMAKE_SYSTEM_NAME} MATCHES "Linux")
  set(CMAKE_POSITION_INDEPENDENT_CODE ON)
endif()

if (UNIX)
  set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -Wall -Wextra -pedantic")
endif()

if ("${CMAKE_CXX_COMPILER_ID}" MATCHES "Clang")
  set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -Wshorten-64-to-32")
endif()

set(HEADERS
    ../../include/ixwebsocket/IXNetSystem.cpp
    ../../include/ixwebsocket/IXUserAgent.cpp
    ../../include/ixwebsocket/IXWebSocket.cpp
)

add_executable(demo main.cpp)
target_include_directories(demo PUBLIC ../../include)

set(IXWEBSOCKET_LIB_DIR ${PROJECT_SOURCE_DIR}/../../lib)

if(WIN32 OR MSVC OR MSYS OR MINGW)
    # for Windows operating system in general
    set(IS_WINDOWS TRUE)
    set(OS_NAME windows)
    set(IXWEBSOCKET_LIB_NAME_SHARED ixwebsocket.dll)
    set(IXWEBSOCKET_LIB_NAME_STATIC ixwebsocket.lib)
elseif(UNIX AND NOT APPLE)
    # for Linux, BSD, Solaris, Minix
    set(OS_NAME linux)
    set(IXWEBSOCKET_LIB_NAME_SHARED libixwebsocket.so)
endif()

if(CMAKE_SIZEOF_VOID_P EQUAL 8)
    # 64 bits
    set(CPU_PREFIX x64)
elseif(CMAKE_SIZEOF_VOID_P EQUAL 4)
    # 32 bits
    set(CPU_PREFIX x32)
endif()

set(IXWEBSOCKET_ABSOLUTE_PATH_SHARED ${IXWEBSOCKET_LIB_DIR}/${OS_NAME}/${CPU_PREFIX}/${IXWEBSOCKET_LIB_NAME_SHARED})
set(IXWEBSOCKET_ABSOLUTE_PATH_STATIC ${IXWEBSOCKET_LIB_DIR}/${OS_NAME}/${CPU_PREFIX}/${IXWEBSOCKET_LIB_NAME_STATIC})

add_library(ixwebsocket SHARED IMPORTED GLOBAL)
set_target_properties(ixwebsocket PROPERTIES IMPORTED_LOCATION ${IXWEBSOCKET_ABSOLUTE_PATH_SHARED})

if(IS_WINDOWS)
    set_target_properties(ixwebsocket PROPERTIES IMPORTED_IMPLIB ${IXWEBSOCKET_ABSOLUTE_PATH_STATIC})
endif()

target_link_libraries(demo ixwebsocket)

add_custom_command(
        TARGET ${PROJECT_NAME} POST_BUILD
        COMMAND ${CMAKE_COMMAND} -E copy
        ${IXWEBSOCKET_ABSOLUTE_PATH_SHARED}
        $<TARGET_FILE_DIR:${PROJECT_NAME}>)
