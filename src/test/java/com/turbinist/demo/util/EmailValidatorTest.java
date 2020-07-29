package com.turbinist.demo.util;


import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class EmailValidatorTest {

    private final EmailValidator underTest = new EmailValidator();

    @Test
    void itShouldValidateEmail() {
        assertThat(underTest.test("hello@email.com")).isTrue();
    }

    @Test
    void itShouldValidateAnIncorrectEmail() {
        assertThat(underTest.test("helloemail.com")).isFalse();
    }

    @Test
    void itShouldValidateAnIncorrectEmailWithOutDot() {
        assertThat(underTest.test("hello@emailcom")).isFalse();
    }
}